window.addEventListener('load', () => {
  chrome.storage.sync.get("searchTerms", (data) => {
    const searchTerms = data.searchTerms.filter(term => term !== "");
    const destinationList = document.querySelector('.destination_list');
    if (destinationList) {
      const textContent = destinationList.textContent;
      const results = Array.from(document.querySelectorAll('.destination_list h3.ttl a')).map(a => a.textContent);
      const allTermsHavving = searchTerms.every(term => new RegExp(term).test(textContent));
      if (!allTermsHavving) {
        console.info("Not all search terms are present.\n", results.join(", "));
        const searchButton = document.getElementById('link_search');
        if (searchButton) {
          searchButton.click();
        }
      }
      else {
        console.info("All search terms are present.\n", results.join(", "));
      }
    }
    else {
      const err = document.querySelector('.mainttl');
      if (err) {
        if (err.textContent == "検索回数上限エラー") {
          console.log("Error occurred in the search limit.");
          if (window.confirm("このサイトのデータを削除しますか？")) {
            chrome.runtime.sendMessage({ action: "clearData" });
          }
        }
      }
    }
  });
});