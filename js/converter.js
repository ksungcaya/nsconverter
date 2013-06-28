$(function() {
	var res 		=	""; 
	var resBinary	=	"";
	var resOctal	=	"";
	var resDecimal	=	"";
	var resHexa		=	"";

	$("#binConvert").on("click", function() {
		var txtVal = $("#txtBinary").val();
		var regex  = /^[0-1]+$/;

		if(regex.test(txtVal) || txtVal == "") {
			resDecimal = toDecimal(txtVal);
			resOctal   = toOctal(txtVal);
			resHexa    = toHexa(txtVal);

			//write the result
			res = result(resBinary, resOctal, resDecimal, resHexa);
			$("#binResult").html(res);
		} else {
			$("#binError").popup("open");
		}
		
	});

	$("#octaConvert").on("click", function() {
		var txtVal = $("#txtOctal").val();
		resBinary  = partToBinary(txtVal,"8");
		resDecimal = toDecimal(resBinary);
		resHexa    = toHexa(resBinary);

		//write the result
		res = result(resBinary, resOctal, resDecimal, resHexa);
		$("#octaResult").html(res);
	});

	$("#deciConvert").on("click", function() {
		var txtVal = $("#txtDecimal").val();
		resBinary  = toBinary(txtVal,"");
		resOctal   = toOctal(resBinary);
		resHexa    = toHexa(resBinary);

		//write the result
		res = result(resBinary, resOctal, resDecimal, resHexa);
		$("#deciResult").html(res);
	});

	$("#hexaConvert").on("click", function() {
		var txtVal = $("#txtHexa").val();
		var regex  = /^[a-fA-F0-9]+$/;

		if(regex.test(txtVal) || txtVal == "") {
			resBinary  = partToBinary(txtVal,"16");
			resOctal   = toOctal(resBinary);
			resDecimal = toDecimal(resBinary);

			//write the result
			res = result(resBinary, resOctal, resDecimal, resHexa);
			$("#hexaResult").html(res);
		} else {
			$("#hexaError").popup("open");
		}		
		
	});

	$(".btnClear").on("click", function() {
		$(".txtbox").val('');
		$(".con-result").remove();
	});	

	$(".exit").on("click", function() {
		window.close();
	});
});

function partToBinary(value,type) {
	var len 		= value.length;
	var counter 	= 1;
	var converted	= [];
	for (var i = len - 1; i >= 0; i--) {
		if(type == 8) {
			converted.push(toBinary(value[i],type));
		}
		if(type == 16) {
			var deciVal = 0;
			if(value[i] == "A" || value[i] == "a") { deciVal = 10; }
			else if(value[i] == "B" || value[i] == "b") { deciVal = 11; }
			else if(value[i] == "C" || value[i] == "c") { deciVal = 12; }
			else if(value[i] == "D" || value[i] == "d") { deciVal = 13; }
			else if(value[i] == "E" || value[i] == "e") { deciVal = 14; }
			else if(value[i] == "F" || value[i] == "f") { deciVal = 15; }
			else { deciVal = value[i]; }
			converted.push(toBinary(deciVal,type));
		}
		
	}
	return converted.reverse().join("").replace(/^0+/, '');
}

function toBinary(value,type) {
	var binary   = "";
	var quotient = 0;
	while(value / 2 != 0) {
		quotient = value / 2;
		binary += value % 2;
		value = Math.floor(quotient);
	}
	if(type == 8) {
		while(binary.length != 3) {
			if(value / 2 <= 0) {
				binary += "0";
			}
		}
	}
	if(type == 16) {
		while(binary.length != 4) {
			if(value / 2 <= 0) {
				binary += "0";
			}
		}
	}
	
	return binary.split("").reverse().join("");
}

function toDecimal(value) {
	var len 		= value.length;
	var counter 	= 1;
	var converted	= 0;
	for (var i = len - 1; i >= 0; i--) {
		if(value[i] == 1) {
			converted = converted + counter;
		}
		counter = counter * 2;
	}
	return converted;
}

function toOctal(value) {
	var len 	  = value.length;
	var if_three  = 0;
	var toConvert = "";
	var converted = "";
	for(var i = len - 1; i >= 0; i--) {
		if(if_three < 3) {
			toConvert += value[i];
			if_three++;
			if(i == 0 && if_three != 3) {
				toConvert = toConvert.split("").reverse().join("");
				converted += toDecimal(toConvert);
			}
		}

		if(if_three == 3) {
			//convert binary and reset values
			toConvert = toConvert.split("").reverse().join("");
			converted += toDecimal(toConvert);
			if_three  = 0;
			toConvert = "";
		}
	}
	return converted.split("").reverse().join("");
}

function toHexa(value) {
	var len 	  = value.length;
	var if_four   = 0;
	var toConvert = "";
	var converted = "";
	for(var i = len - 1; i >= 0; i--) {
		if(if_four < 4) {
			toConvert += value[i];
			if_four++;
			if(i == 0 && if_four != 4) {
				toConvert = toConvert.split("").reverse().join("");
				part_converted = toDecimal(toConvert);
				if(part_converted == "10") { converted += "A"; }
				else if(part_converted == "11") { converted += "B"; }
				else if(part_converted == "12") { converted += "C"; }
				else if(part_converted == "13") { converted += "D"; }
				else if(part_converted == "14") { converted += "E"; }
				else if(part_converted == "15") { converted += "F"; }
				else { converted += part_converted; }
			}
		}

		if(if_four == 4) {
			//convert binary and reset values
			toConvert = toConvert.split("").reverse().join("");
			part_converted = toDecimal(toConvert);
			if(part_converted == "10") { converted += "A"; }
			else if(part_converted == "11") { converted += "B"; }
			else if(part_converted == "12") { converted += "C"; }
			else if(part_converted == "13") { converted += "D"; }
			else if(part_converted == "14") { converted += "E"; }
			else if(part_converted == "15") { converted += "F"; }
			else { converted += part_converted; }
			if_four  = 0;
			toConvert = "";
		}
	}
	return converted.split("").reverse().join("");
}

function result(binary, octal, decimal, hexa) {
	var html = "";
	if(binary != "" || octal != "" || decimal != "" || hexa != "") {
		html += '<table data-role="table" id="con-result" data-mode="" class="con-result ui-responsive table-stroke">' + "\n"
				+  '	<tr><th colspan="2" "center">RESULTS</th></tr>' + "\n";
		if(binary != "")
		html	+= '	<tr>' + "\n"
				+  '		<th class="title">Binary: </th>' + "\n"
				+  '		<td>' + binary + '<sub>2</sub></td>' + "\n"
				+  '	</tr>' + "\n";
		if(octal != "")
		html	+= '	<tr>' + "\n"
				+  '		<th class="title">Octal: </th>' + "\n"
				+  '		<td>' + octal + '<sub>8</sub></td>' + "\n"
				+  '	</tr>' + "\n";
		if(decimal != "")
		html	+= '	<tr>' + "\n"
				+  '		<th class="title">Decimal: </th>' + "\n"
				+  '		<td>' + decimal + '<sub>10</sub></td>' + "\n"
				+  '	</tr>' + "\n";
		if(hexa != "")
		html	+= '	<tr>' + "\n"
				+  '		<th class="title">Hexadecimal: </th>' + "\n"
				+  '		<td>' + hexa + '<sub>16</sub></td>' + "\n"
				+  '	</tr>' + "\n";
		html	+= '</table>';
	}

	return html;
}