const closeDropdown = () => {
  const dropdownElement = document.activeElement as HTMLElement;
  if (dropdownElement) {
    dropdownElement.blur();
  }
};

export default closeDropdown;
