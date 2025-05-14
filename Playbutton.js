const buttons = document.querySelectorAll('.chakra-button.css-cuh8pi');

buttons.forEach(button => {
  button.style.padding = '20px 40px';
  button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
  button.style.color = 'white';
  button.style.border = '1px solid #D3D3D3';
  button.style.borderRadius = '12px';
  button.style.fontSize = '22px';
  button.style.cursor = 'pointer';
  button.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
  button.style.outline = 'none';
  button.style.boxShadow = 'none';

  button.addEventListener('focus', () => {
    button.style.outline = '2px solid #B0B0B0';
    button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
  });

  button.addEventListener('blur', () => {
    button.style.outline = 'none';
    button.style.boxShadow = 'none';
  });

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
    button.style.transform = 'scale(1.15)';
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('mousedown', () => {
    button.style.outline = '2px solid #B0B0B0';
    button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
  });

  button.addEventListener('mouseup', () => {
    button.style.outline = '2px solid #B0B0B0';
    button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
  });
});
