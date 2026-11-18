// Component SearchForm: nhận từ khóa và gửi lên App thông qua Props.
(function () {
  const h = React.createElement;

  window.SearchForm = function SearchForm({ onChangeValue }) {
    return h("div", { className: "search-box" },
      h("label", { htmlFor: "keyword" }, "Tìm kiếm người dùng"),
      h("input", {
        id: "keyword",
        type: "text",
        placeholder: "Tìm theo name hoặc username...",
        onChange: (event) => onChangeValue(event.target.value)
      })
    );
  };
})();
