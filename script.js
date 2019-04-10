// label floating

const FloatLabel = (() => {
  // add active class and placeholder
  const handleFocus = e => {
    const target = e.target;
    target.parentNode.classList.add('active');
    target.parentNode.classList.add('editing');
  };

  // remove active class and placeholder
  const handleBlur = e => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove('active');
      target.parentNode.classList.remove('not-empty');
      target.parentNode.classList.remove('editing');
    }
    if (target.value) {
      target.parentNode.classList.add('not-empty');
      target.parentNode.classList.remove('editing');
    }
  };

  // register events
  const bindEvents = element => {
    const floatField = element.querySelector('input');
    floatField.addEventListener('focus', handleFocus);
    floatField.addEventListener('blur', handleBlur);
  };

  // get DOM elements
  const init = () => {
    const containers = document.querySelectorAll('.input-wrapper');

    containers.forEach(element => {
      if (element.querySelector('input').value) {
        element.classList.add('active');
        element.classList.add('not-empty');
      }

      bindEvents(element);
    });
  };

  return {
    init: init,
  };
})();

FloatLabel.init();

// autofill detection
const AUTOFILLED = 'is-autofilled';
const onAutoFillStart = el => {
  const label = el.parentNode.querySelector('label');
  label.classList.add(AUTOFILLED);
  // el.classList.add(AUTOFILLED);
};
const onAutoFillCancel = el => {
  const label = el.parentNode.querySelector('label');
  label.classList.remove(AUTOFILLED);
  // el.classList.remove(AUTOFILLED);
};
const onAnimationStart = ({ target, animationName }) => {
  switch (animationName) {
    case 'onAutoFillStart':
      return onAutoFillStart(target);
    case 'onAutoFillCancel':
      return onAutoFillCancel(target);
  }
};

document.querySelectorAll('input').forEach(element => {
  element.addEventListener('animationstart', onAnimationStart, false);
});
