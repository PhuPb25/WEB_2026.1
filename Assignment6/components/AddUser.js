(function () {
  const h = React.createElement;

  const emptyUser = () => ({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  window.AddUser = function AddUser({ onAdd }) {
    const [adding, setAdding] = React.useState(false);
    const [user, setUser] = React.useState(emptyUser());

    function handleChange(event) {
      const { id, value } = event.target;
      if (["street", "suite", "city"].includes(id)) {
        setUser({
          ...user,
          address: { ...user.address, [id]: value }
        });
      } else {
        setUser({ ...user, [id]: value });
      }
    }

    function handleAdd() {
      if (!user.name.trim() || !user.username.trim()) {
        alert("Vui lòng nhập Name và Username!");
        return;
      }
      onAdd(user);
      setUser(emptyUser());
      setAdding(false);
    }

    return h(React.Fragment, null,
      h("button", {
        className: "btn btn-primary",
        type: "button",
        onClick: () => setAdding(true)
      }, "+ Thêm người dùng"),

      adding && h("div", { className: "modal-overlay" },
        h("div", { className: "modal-content" },
          h("div", { className: "modal-header" },
            h("h2", null, "Thêm người dùng"),
            h("button", {
              className: "icon-button",
              type: "button",
              onClick: () => setAdding(false),
              "aria-label": "Đóng"
            }, "×")
          ),
          h("div", { className: "form-grid" },
            h("label", null, "Name *",
              h("input", { id: "name", value: user.name, onChange: handleChange, placeholder: "Họ và tên" })
            ),
            h("label", null, "Username *",
              h("input", { id: "username", value: user.username, onChange: handleChange, placeholder: "Tên đăng nhập" })
            ),
            h("label", null, "Email",
              h("input", { id: "email", type: "email", value: user.email, onChange: handleChange, placeholder: "email@example.com" })
            ),
            h("label", null, "Phone",
              h("input", { id: "phone", value: user.phone, onChange: handleChange, placeholder: "Số điện thoại" })
            ),
            h("label", null, "Street",
              h("input", { id: "street", value: user.address.street, onChange: handleChange })
            ),
            h("label", null, "Suite",
              h("input", { id: "suite", value: user.address.suite, onChange: handleChange })
            ),
            h("label", null, "City",
              h("input", { id: "city", value: user.address.city, onChange: handleChange })
            ),
            h("label", null, "Website",
              h("input", { id: "website", value: user.website, onChange: handleChange, placeholder: "example.com" })
            )
          ),
          h("div", { className: "modal-actions" },
            h("button", { className: "btn btn-secondary", type: "button", onClick: () => setAdding(false) }, "Hủy"),
            h("button", { className: "btn btn-primary", type: "button", onClick: handleAdd }, "Thêm")
          )
        )
      )
    );
  };
})();