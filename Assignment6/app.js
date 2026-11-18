// Component gốc App: tập trung state dùng chung và truyền dữ liệu qua Props.
function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">REACT FUNDAMENTALS · CRUD</p>
          <h1>Quản lý người dùng</h1>
          <p className="page-description">
            Thực hành Create, Read, Update, Delete với React Hooks và Props.
          </p>
        </div>
      </header>

      <section className="toolbar">
        <SearchForm onChangeValue={setKeyword} />
        <AddUser onAdd={setNewUser} />
      </section>

      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />

      <footer className="page-footer">
        Dữ liệu mẫu được tải từ JSONPlaceholder API.
      </footer>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
