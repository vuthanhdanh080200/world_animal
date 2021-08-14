export default function encodeImageFileAsURL(input, callback) {
  var file = input.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    callback(reader.result);
  };
}
