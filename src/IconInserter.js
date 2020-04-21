const IconInserter = (() => {
  const render = (name, color = 'black') => {
    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.setAttribute('src', `img/baseline_${name}_${color}_18dp.png`);
    icon.setAttribute('alt', name);
    return icon;
  }

  return {
    render,
  }
})();

export default IconInserter;