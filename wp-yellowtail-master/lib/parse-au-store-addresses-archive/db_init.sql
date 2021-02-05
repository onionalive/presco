CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `chain` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `suburb` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(3) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `postcode` varchar(4) NOT NULL DEFAULT '',
  `google_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4210 DEFAULT CHARSET=utf8;
