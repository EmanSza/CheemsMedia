const deepai = require('deepai')
deepai.setApiKey('19d6f18a-dd0a-4d2a-912f-c4b2a28ba75b');

module.exports = isNsfw

function isNsfw (url){
  try {
      var response = await deepai.callStandardApi("nsfw-detector", { image: url});
    } catch (e) {
      console.log(e)
    }

    if (response){
      var detect = response.output.detections
      var exposed = false
      var nsfw = false
      detect.forEach(function (d) {
        var name = d.name
        var confidence = parseFloat(d.confidence)

        if(name.includes("Exposed") && confidence > 0.4){
          exposed = true
        }
      })

      if (exposed || response.output.nsfw_score > 0.4) nsfw = true

      return nsfw
    }
  return false
}
