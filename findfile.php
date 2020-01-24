<?php

$path = "static/img/album";
$iterator = new FilesystemIterator($path, FilesystemIterator::KEY_AS_PATHNAME | FilesystemIterator::UNIX_PATHS);
$filter = new RegexIterator($iterator, '/\.(jpg|png)$/');
$filelist = array();
foreach ($filter as $entry) {
  $filelist[] = $entry->getPathname();
}

$json = json_encode($filelist);
echo $json;
exit();