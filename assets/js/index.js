const activarSonido = () => {
  var audio = document.getElementById('audioScaner');
  audio.play();
}

window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader()
  console.log('ZXing code reader initialized')



  this.navigator.mediaDevices.enumerateDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1) {
        counter = 0
        videoInputDevices.forEach((element) => {
          counter += 1
          const sourceOption = document.createElement('option')
          sourceOption.text = "DEV "+counter+element.label
          beforeval = this.document.getElementById("loginput").value
          this.document.getElementById("loginput").value += beforeval+JSON.stringify(element)
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        sourceSelectPanel.style.display = 'block'
      }

      document.getElementById('startButton').addEventListener('click', () => {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result)
            activarSonido();
            document.getElementById('result').value = result.text
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            document.getElementById('result').value = err;
          }
        })
        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
      })

      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        document.getElementById('result').value = '';
        console.log('Reset.')
      })

    })
    .catch((err) => {
      console.error(err)
    })
})

url = "https://script.google.com/macros/s/AKfycbyOWl8_-HfeIeHYBtfVSkcOGnXlN9Kn9KfjIE0dyAF2EPCURwgyBeU1Fth5QRkb0ofYQw/exec"

const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

async function EnviarForm(){

  let Serial = document.getElementById("result").value
  let Desk = document.getElementById("desk").value
  let Floor = document.getElementById("floor").value
  let Type = document.getElementById("assettype").value
  console.log(Serial,Desk,Floor,Type)
  urlsend = url+"?serialn="+Serial+"&estacionn="+Desk+"&piso="+Floor


  document.getElementById('sendButton').disabled = true 
  try {
    const response = await fetch(urlsend, {method: "POST",mode: "no-cors"});
    console.log("Success:", response.status);

    document.getElementById('icontoast').className = "bi bi-check-circle-fill" 
    document.getElementById('Toastmessage').innerHTML = "Datos agregados correctamente "
    document.getElementById('lasData').innerHTML = "SN ="+Serial+" Desk ="+Desk+" Floor ="+Floor
    document.getElementById('sendButton').disabled = false
    toastBootstrap.show()
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('icontoast').className = "bi bi-x-circle-fill"
    document.getElementById('Toastmessage').innerHTML = "Ha ocurrido un error "+error 
    document.getElementById('sendButton').disabled = false
    toastBootstrap.show()
  }

}


document.getElementById('sendButton').addEventListener('click', () => {
  EnviarForm();
})

