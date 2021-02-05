<?php 

require_once('../../wp/wp-config.php');

class SerialiseJson {
	private $db;
	private $data;
	private $save;

	function __construct() {
		$this->save = true;
		$this->data = array();
		$this->db = new PDO("mysql:host=" . DB_HOST . ";port=3306;dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public function update() {
		$sql = "SELECT * FROM wp_postmeta WHERE meta_key = 'lat'";
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$data = $stmt->fetchAll();

		foreach ($data as $single) {
			$latObj = (object) $single;
			$lat = $latObj->meta_value;

			$sql = "SELECT * FROM wp_postmeta WHERE post_id = '".$latObj->post_id."' AND meta_key = 'lng'";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetch();
			$lngObject = (object) $result;
			$lng = $lngObject->meta_value;

			$test = array(
				'address' => '',
				'lat' => $lat,
				'lng' => $lng
			);

			$serial = serialize($test);
			$metakey = "geolocation";

			$sql = "SELECT * FROM wp_postmeta WHERE post_id ='".$latObj->post_id."' AND meta_key = '".$metakey."'";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();				
			$result = $stmt->fetchObject();

			if($result) {
				echo "Record already exists:\n\r";
				print_r($result);
			} else {
				$sql = "INSERT INTO wp_postmeta(post_id,meta_key,meta_value) VALUES (:storeId,:metakey,:metavalue)";
				$stmt = $this->db->prepare($sql);
				$stmt->bindParam(':storeId', $latObj->post_id, PDO::PARAM_INT);
				$stmt->bindParam(':metakey', $metakey, PDO::PARAM_STR);
				$stmt->bindParam(':metavalue', $serial, PDO::PARAM_STR);
				$stmt->execute();
			}
		}
	}
}

$data = new SerialiseJson();
$data->update();

?> 
