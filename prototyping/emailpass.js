const inputFields = document.querySelectorAll('.chakra-form-control .chakra-input');

inputFields.forEach(input => {
  input.style.padding = '8px 16px';
  input.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
  input.style.color = 'black';
  input.style.border = '1px solid #D3D3D3';
  input.style.borderRadius = '6px';
  input.style.fontSize = '14px';
  input.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
  input.style.outline = 'none';
  input.style.boxShadow = 'none';

  input.addEventListener('focus', () => {
    input.style.outline = '2px solid #B0B0B0';
    input.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
  });

  input.addEventListener('blur', () => {
    input.style.outline = 'none';
    input.style.boxShadow = 'none';
  });

  input.addEventListener('mouseover', () => {
    input.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
    input.style.transform = 'scale(1.05)';
  });

  input.addEventListener('mouseout', () => {
    input.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
    input.style.transform = 'scale(1)';
  });
});
