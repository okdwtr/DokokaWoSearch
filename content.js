window.addEventListener('load', () => {
  chrome.storage.sync.get("searchTerms", (data) => {
    const searchTerms = data.searchTerms.filter(term => term !== "");
    const destinationList = document.querySelector('.destination_list');
    if (destinationList) {
      const textContent = destinationList.textContent;
      const allTermsHaving = searchTerms.every(term => new RegExp(term).test(textContent));
      if (!allTermsHaving) {
        const searchButton = document.getElementById('link_search');
        if (searchButton) {
          searchButton.click();
        }
      }
    }
  });
});