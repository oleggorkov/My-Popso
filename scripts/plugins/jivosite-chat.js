export default (ctx) => {
  function loadScript() {
    return new Promise((resolve, reject) => {
      const head = document.head || document.getElementsByTagName('head')[0];
      const script = document.createElement('script');

      script.async = true;
      script.charset = 'utf8';
      script.src = '//code.jivosite.com/widget/FOKzXONYHT';

      head.appendChild(script);

      script.onload = resolve;
      script.onerror = reject;
    })
  }

  new Promise((resolve, reject) => {
    const funcToCall = () => {
      loadScript().then(resolve, reject)
    };

    if (document.readyState === 'complete')
      funcToCall();
    else
      window.addEventListener('load', funcToCall, false)
  })
}
