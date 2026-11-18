// Component ResultTable: tải, hiển thị, tìm kiếm, thêm, sửa và xóa người dùng.
(function () {
  const h = React.createElement;

  window.ResultTable = function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editing, setEditing] = React.useState(null);

    // BƯỚC 4: Chỉ gọi API một lần khi ResultTable được render lần đầu.
    React.useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) throw new Error("Không thể tải dữ liệu người dùng");
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          alert("Không tải được dữ liệu từ API. Vui lòng tải lại trang.");
        });
    }, []);

    // BƯỚC 5: Khi prop user thay đổi, thêm người dùng mới vào danh sách.
    React.useEffect(() => {
      if (user) {
        setUsers((prev) => [
          ...prev,
          { ...user, id: prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1 }
        ]);
        onAdded();
      }
    }, [user]);

    // BƯỚC 6: Sao chép cả user và address để không sửa trực tiếp dữ liệu gốc.
    function editUser(selectedUser) {
      setEditing({
        ...selectedUser,
        address: { ...(selectedUser.address || {}) }
      });
    }

    function handleEditChange(field, value) {
      if (["street", "suite", "city"].includes(field)) {
        setEditing((prev) => ({
          ...prev,
          address: { ...prev.address, [field]: value }
        }));
      } else {
        setEditing((prev) => ({ ...prev, [field]: value }));
      }
    }

    function saveUser() {
      if (!editing.name.trim() || !editing.username.trim()) {
        alert("Name và Username không được để trống!");
        return;
      }

      setUsers((prev) => prev.map((item) => item.id === editing.id ? editing : item));
      setEditing(null);
    }

    // BƯỚC 7: Dùng filter() tạo mảng mới không chứa user cần xóa.
    function removeUser(id) {
      setUsers((prev) => prev.filter((item) => item.id !== id));
    }

    const normalizedKeyword = keyword.toLowerCase();
    const filteredUsers = users.filter((item) =>
      (item.name || "").toLowerCase().includes(normalizedKeyword) ||
      (item.username || "").toLowerCase().includes(normalizedKeyword)
    );

    if (loading) {
      return h("p", { className: "status-message" }, "Đang tải dữ liệu người dùng...");
    }

    return h("section", { className: "table-section" },
      h("div", { className: "table-heading" },
        h("div", null,
          h("h2", null, "Danh sách người dùng"),
          h("p", { className: "muted" }, `Hiển thị ${filteredUsers.length} / ${users.length} người dùng`)
        )
      ),

      h("div", { className: "table-wrapper" },
        h("table", null,
          h("thead", null,
            h("tr", null,
              ["ID", "Name", "Username", "Email", "Address", "Phone", "Thao tác"].map((heading) =>
                h("th", { key: heading }, heading)
              )
            )
          ),
          h("tbody", null,
            filteredUsers.length === 0
              ? h("tr", null, h("td", { colSpan: 7, className: "empty-cell" }, "Không tìm thấy người dùng phù hợp."))
              : filteredUsers.map((item) =>
                h("tr", { key: item.id },
                  h("td", null, item.id),
                  h("td", null, item.name),
                  h("td", null, item.username),
                  h("td", null, item.email),
                  h("td", null, [
                    item.address?.street,
                    item.address?.suite,
                    item.address?.city
                  ].filter(Boolean).join(", ") || "—"),
                  h("td", null, item.phone || "—"),
                  h("td", { className: "action-cell" },
                    h("button", {
                      className: "btn btn-edit",
                      type: "button",
                      onClick: () => editUser(item)
                    }, "Sửa"),
                    h("button", {
                      className: "btn btn-delete",
                      type: "button",
                      onClick: () => removeUser(item.id)
                    }, "Xóa")
                  )
                )
              )
          )
        )
      ),

      // Modal chỉnh sửa người dùng.
      editing && h("div", { className: "modal-overlay" },
        h("div", { className: "modal-content" },
          h("div", { className: "modal-header" },
            h("h2", null, "Chỉnh sửa người dùng"),
            h("button", {
              className: "icon-button",
              type: "button",
              onClick: () => setEditing(null),
              "aria-label": "Đóng"
            }, "×")
          ),
          h("div", { className: "form-grid" },
            h("label", null, "Name *",
              h("input", { value: editing.name || "", onChange: (e) => handleEditChange("name", e.target.value) })
            ),
            h("label", null, "Username *",
              h("input", { value: editing.username || "", onChange: (e) => handleEditChange("username", e.target.value) })
            ),
            h("label", null, "Email",
              h("input", { value: editing.email || "", onChange: (e) => handleEditChange("email", e.target.value) })
            ),
            h("label", null, "Phone",
              h("input", { value: editing.phone || "", onChange: (e) => handleEditChange("phone", e.target.value) })
            ),
            h("label", null, "Street",
              h("input", { value: editing.address?.street || "", onChange: (e) => handleEditChange("street", e.target.value) })
            ),
            h("label", null, "Suite",
              h("input", { value: editing.address?.suite || "", onChange: (e) => handleEditChange("suite", e.target.value) })
            ),
            h("label", null, "City",
              h("input", { value: editing.address?.city || "", onChange: (e) => handleEditChange("city", e.target.value) })
            ),
            h("label", null, "Website",
              h("input", { value: editing.website || "", onChange: (e) => handleEditChange("website", e.target.value) })
            )
          ),
          h("div", { className: "modal-actions" },
            h("button", { className: "btn btn-secondary", type: "button", onClick: () => setEditing(null) }, "Hủy"),
            h("button", { className: "btn btn-primary", type: "button", onClick: saveUser }, "Lưu thay đổi")
          )
        )
      )
    );
  };
})();
