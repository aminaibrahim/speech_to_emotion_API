document.addEventListener("DOMContentLoaded", speechToEmotion, false);

function speechToEmotion() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;

  recognition.onresult = function(event) {
    const results = event.results;
    const transcript = results[results.length - 1][0].transcript;

    console.log(transcript);

    setEmoji("searching");

    fetch(`/emotion?text=${transcript}`)
      .then(response => {
        console.log(response.json());
        return response;
      })
      .then(result => {
        if (result.score > 0) {
          setEmoji("positive");
        } else if (result.score < 0) {
          setEmoji("negative");
        } else {
          setEmoji("listening");
        }
      })
      .catch(e => {
        console.error("Request error -> ", e);
        recognition.abort();
      });
  };

  recognition.onerror = function(event) {
    console.error("Recognition error -> ", event.error);
    setEmoji("error");
  };

  recognition.onaudiostart = function() {
    setEmoji("listening");
  };

  recognition.onend = function() {
    console.log("end");
  };

  recognition.start();

  /**
   * @param {string} type - could be any of the following:
   *   error|idle|listening|negative|positive|searching
   */
  function setEmoji(type) {
    const emojiElem = document.querySelector(".emoji img");
    emojiElem.classList = type;
  }
}
