<?php

Class Recipes {
	public static function darkenColour($rgb='#FAC323', $darker=1.3) {

		$hash = (strpos($rgb, '#') !== false) ? '#' : '';
		$rgb = (strlen($rgb) == 7) ? str_replace('#', '', $rgb) : ((strlen($rgb) == 6) ? $rgb : false);
		if(strlen($rgb) != 6) return $hash.'000000';
		$darker = ($darker > 1) ? $darker : 1;

		list($R16,$G16,$B16) = str_split($rgb,2);

		$R = sprintf("%02X", floor(hexdec($R16)/$darker));
		$G = sprintf("%02X", floor(hexdec($G16)/$darker));
		$B = sprintf("%02X", floor(hexdec($B16)/$darker));

		return $hash.$R.$G.$B;
	}
}

?>
