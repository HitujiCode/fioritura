<?php

/* 基本設定 */
function my_setup()
{
  add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
  add_theme_support('automatic-feed-links'); // 投稿とコメントのRSSフィードのリンクを有効化
  add_theme_support('title-tag'); // titleタグ自動生成
  add_theme_support('html5', array( // HTML5による出力
    'search-form',
    'comment-form',
    'comment-list',
    'gallery',
    'caption',
  ));
}
add_action('after_setup_theme', 'my_setup');

/* wordpressバージョン情報の削除 */
remove_action("wp_head", "wp_generator");

/* 投稿者一覧ページを自動で生成されないようにする */
function disable_author_archive()
{
  if (preg_match('#/author/.+#', $_SERVER['REQUEST_URI'])) {
    wp_redirect(esc_url(home_url('/404.php')));
    exit;
  }
}
add_action('init', 'disable_author_archive');

/* script、style設定 */
function my_script_init()
{
  // WordPressに含まれているjquery.jsを読み込まない
  wp_deregister_script('jquery');

  // フォント
  wp_enqueue_style('google-fonts-noto-serif', '//fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&display=swap', array(), 'null');

  // swiper
  wp_enqueue_script('jquery', '//code.jquery.com/jquery-3.7.1.min.js', array(), '1.0.1');
  wp_enqueue_script('slider-js', '//unpkg.com/swiper@8/swiper-bundle.min.js', array(), '', true);
  wp_enqueue_style('slider-css', '//unpkg.com/swiper@8/swiper-bundle.min.css', array(), '', 'all');

  // JavaScript
  wp_enqueue_script('my-script', get_template_directory_uri() . '/assets/js/script.js', array('jquery'), '1.0.1', true);

  // css
  wp_enqueue_style('my-style', get_template_directory_uri() . '/assets/css/style.css', array(), '1.0.1', 'all');
}
add_action('wp_enqueue_scripts', 'my_script_init');

/**
 * wp_enqueue_scriptで読み込むjsにdeferを付ける
 */
add_filter('script_loader_tag', 'add_defer', 10, 2);
function add_defer($tag, $handle)
{
  if ($handle !== 'my-script') {
    return $tag;
  }
  return str_replace(' src=', ' defer src=', $tag);
}

/* Contact Form 7で自動挿入されるPタグ、brタグを削除 */
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
function wpcf7_autop_return_false()
{
  return false;
}

// 絵文字設定の削除
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// RSDの削除
remove_action('wp_head', 'rsd_link');



// エディターを非表示
function my_custom_init()
{
  remove_post_type_support('post', 'editor');
  remove_post_type_support('works', 'editor');
}
add_action('admin_init', 'my_custom_init');

// 相談事例詳細のスラッグを自動設定
function set_custom_post_slug($data, $postarr)
{
  if ($data['post_type'] === 'post' && isset($postarr['ID'])) {
    $data['post_name'] = 'case-article' . $postarr['ID'];
  }
  return $data;
}
add_filter('wp_insert_post_data', 'set_custom_post_slug', 10, 2);

// 撮影事例詳細のスラッグを自動設定
function set_custom_archive_slug($data, $postarr)
{
  if ($data['post_type'] === 'works' && isset($postarr['ID'])) {
    $data['post_name'] = 'works-article-' . $postarr['ID']; // スラッグの形式を変更
  }
  return $data;
}
add_filter('wp_insert_post_data', 'set_custom_archive_slug', 10, 2);

// 繰り返しフィールドの画像IDを取得
function get_attachment_id_from_url($image_url)
{
  global $wpdb;
  $query = "SELECT post_id FROM $wpdb->postmeta WHERE meta_value = %s";
  $attachment_id = $wpdb->get_var($wpdb->prepare($query, $image_url));

  // IDが見つからない場合は、URLを再構成して再試行
  if (empty($attachment_id)) {
    $upload_dir_paths = wp_upload_dir();
    // URLからベースURLを削除
    $image_path = str_replace($upload_dir_paths['baseurl'] . '/', '', $image_url);
    $query = "SELECT post_id FROM $wpdb->postmeta WHERE meta_value LIKE %s";
    $attachment_id = $wpdb->get_var($wpdb->prepare($query, '%' . $wpdb->esc_like($image_path)));
  }

  return $attachment_id;
}

/* カスタム投稿のページャー対策のためのクエリ変更 */
// 通常の投稿
function custom_taxonomy_normal_query($query)
{
  if (!is_admin() && $query->is_main_query() && is_tax('genre')) {
    $query->set('post_type', 'works');
    $query->set('posts_per_page', 12);
    $query->set('tax_query', array(
      array(
        'taxonomy' => 'genre',
        'field'    => 'slug',
        'terms'    => array('jusan-mairi', 'drone'),
        'operator' => 'NOT IN',
      ),
    ));
  }
}
add_action('pre_get_posts', 'custom_taxonomy_normal_query');

function custom_taxonomy_query_adjustments($query)
{
  if (!is_admin() && $query->is_main_query()) {
    if (is_tax('genre', 'jusan-mairi')) {
      $query->set('post_type', 'works');
      $query->set('posts_per_page', 12);
      $query->set('tax_query', array(
        array(
          'taxonomy' => 'genre',
          'field'    => 'slug',
          'terms'    => 'jusan-mairi',
        ),
      ));
    } elseif (is_tax('genre', 'drone')) {
      $query->set('post_type', 'works');
      $query->set('posts_per_page', 12);
      $query->set('tax_query', array(
        array(
          'taxonomy' => 'genre',
          'field'    => 'slug',
          'terms'    => 'drone',
        ),
      ));
    }
  }
}
add_action('pre_get_posts', 'custom_taxonomy_query_adjustments');

// パンくずリスト文字数制限
add_filter('bcn_breadcrumb_title', 'truncate_bc_title', 10, 3);
function truncate_bc_title($title, $type, $id)
{
  $limit = 20;
  $truncated = mb_substr($title, 0, $limit);

  if (mb_strlen($title) > $limit) {
    $truncated .= '...';
  }

  return $truncated;
}

// メニュー画面の名称変更
function change_menu_name()
{
  global $menu;
  global $submenu;

  $menu[5][0] = '相談事例';
}
add_action('admin_menu', 'change_menu_name');

// メニュー画面の並び順変更
function custom_menu_order($menu_ord)
{
  if (!$menu_ord) return true;

  return array(
    'index.php',  //ダッシュボード
    'edit.php',  //投稿
    'edit.php?post_type=works',
    'upload.php',  //メディア
    'edit.php?post_type=page',  //固定ページ
  );
}
add_filter('custom_menu_order', 'custom_menu_order');
add_filter('menu_order', 'custom_menu_order');

// 不要なメニュー画面の削除
function remove_menu()
{
  remove_menu_page('edit-comments.php'); // コメント
}
add_action('admin_menu', 'remove_menu');
