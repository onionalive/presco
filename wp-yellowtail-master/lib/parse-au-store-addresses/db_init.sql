CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `store_name` varchar(255) DEFAULT NULL,
  `chain_name` varchar(255) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `suburb` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(3) NOT NULL DEFAULT '',
  `postcode` varchar(4) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `lat` DECIMAL(11, 8) DEFAULT NULL,
  `lng` DECIMAL(11, 8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
