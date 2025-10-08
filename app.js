// Importar iconos de lucide-react desde CDN
const { BookOpen, Plus, Trash2, Edit2, Check, X, LogOut, User, Calendar, Clock, Target } = window.lucide;

const StudentStudyPlatform = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [users, setUsers] = React.useState({});
  const [loginForm, setLoginForm] = React.useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = React.useState({ username: '', password: '', name: '' });
  const [showRegister, setShowRegister] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('notes');
  const [editingNote, setEditingNote] = React.useState(null);

  const [noteForm, setNoteForm] = React.useState({ title: '', content: '', subject: '' });
  const [taskForm, setTaskForm] = React.useState({ title: '', description: '', dueDate: '', priority: 'media' });
  const [scheduleForm, setScheduleForm] = React.useState({ day: 'Lunes', subject: '', time: '', duration: '' });
  const [goalForm, setGoalForm] = React.useState({ title: '', description: '', targetDate: '' });

  React.useEffect(() => {
    const storedUsers = {};
    setUsers(storedUsers);
  }, []);

  const handleLogin = () => {
    if (!loginForm.username || !loginForm.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    const user = users[loginForm.username];
    if (user && user.password === loginForm.password) {
      setCurrentUser(loginForm.username);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = () => {
    if (!registerForm.username || !registerForm.password || !registerForm.name) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (users[registerForm.username]) {
      alert('Este usuario ya existe');
      return;
    }

    const newUsers = {
      ...users,
      [registerForm.username]: {
        password: registerForm.password,
        name: registerForm.name,
        notes: [],
        tasks: [],
        schedule: [],
        goals: [],
        createdAt: new Date().toISOString()
      }
    };

    setUsers(newUsers);
    alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión');
    setShowRegister(false);
    setRegisterForm({ username: '', password: '', name: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('notes');
  };

  const getUserData = () => users[currentUser] || {};

  const updateUserData = (field, newData) => {
    const updatedUsers = {
      ...users,
      [currentUser]: {
        ...users[currentUser],
        [field]: newData
      }
    };
    setUsers(updatedUsers);
  };

  const addNote = () => {
    if (!noteForm.title || !noteForm.content) {
      alert('Por favor completa título y contenido');
      return;
    }

    const userData = getUserData();
    const newNote = {
      id: Date.now(),
      ...noteForm,
      createdAt: new Date().toLocaleString('es-MX')
    };

    updateUserData('notes', [...(userData.notes || []), newNote]);
    setNoteForm({ title: '', content: '', subject: '' });
  };

  const deleteNote = (id) => {
    const userData = getUserData();
    updateUserData('notes', userData.notes.filter(n => n.id !== id));
  };

  const updateNote = () => {
    const userData = getUserData();
    updateUserData('notes', userData.notes.map(n => 
      n.id === editingNote.id ? { ...editingNote } : n
    ));
    setEditingNote(null);
  };

  const addTask = () => {
    if (!taskForm.title) {
      alert('Por favor ingresa un título');
      return;
    }

    const userData = getUserData();
    const newTask = {
      id: Date.now(),
      ...taskForm,
      completed: false,
      createdAt: new Date().toLocaleString('es-MX')
    };

    updateUserData('tasks', [...(userData.tasks || []), newTask]);
    setTaskForm({ title: '', description: '', dueDate: '', priority: 'media' });
  };

  const toggleTask = (id) => {
    const userData = getUserData();
    updateUserData('tasks', userData.tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    const userData = getUserData();
    updateUserData('tasks', userData.tasks.filter(t => t.id !== id));
  };

  const addSchedule = () => {
    if (!scheduleForm.subject || !scheduleForm.time) {
      alert('Por favor completa materia y hora');
      return;
    }

    const userData = getUserData();
    const newSchedule = {
      id: Date.now(),
      ...scheduleForm
    };

    updateUserData('schedule', [...(userData.schedule || []), newSchedule]);
    setScheduleForm({ day: 'Lunes', subject: '', time: '', duration: '' });
  };

  const deleteSchedule = (id) => {
    const userData = getUserData();
    updateUserData('schedule', userData.schedule.filter(s => s.id !== id));
  };

  const addGoal = () => {
    if (!goalForm.title) {
      alert('Por favor ingresa un título');
      return;
    }

    const userData = getUserData();
    const newGoal = {
      id: Date.now(),
      ...goalForm,
      completed: false,
      createdAt: new Date().toLocaleString('es-MX')
    };

    updateUserData('goals', [...(userData.goals || []), newGoal]);
    setGoalForm({ title: '', description: '', targetDate: '' });
  };

  const toggleGoal = (id) => {
    const userData = getUserData();
    updateUserData('goals', userData.goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    ));
  };

  const deleteGoal = (id) => {
    const userData = getUserData();
    updateUserData('goals', userData.goals.filter(g => g.id !== id));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Mi Espacio de Estudio</h1>
            <p className="text-gray-600 mt-2">Tu plataforma personal y privada</p>
          </div>

          {!showRegister ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Iniciar Sesión</h2>
              <input
                type="text"
                placeholder="Usuario"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                Crear nueva cuenta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Crear Cuenta</h2>
              <input
                type="text"
                placeholder="Nombre completo"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Usuario"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
              >
                Registrarse
              </button>
              <button
                onClick={() => setShowRegister(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const userData = getUserData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-600">@{currentUser}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'notes', label: 'Notas', icon: BookOpen },
              { id: 'tasks', label: 'Tareas', icon: Check },
              { id: 'schedule', label: 'Horario', icon: Calendar },
              { id: 'goals', label: 'Metas', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingNote ? 'Editar Nota' : 'Nueva Nota'}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Título de la nota"
                  value={editingNote ? editingNote.title : noteForm.title}
                  onChange={(e) => editingNote 
                    ? setEditingNote({...editingNote, title: e.target.value})
                    : setNoteForm({...noteForm, title: e.target.value})
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Materia (opcional)"
                  value={editingNote ? editingNote.subject : noteForm.subject}
                  onChange={(e) => editingNote
                    ? setEditingNote({...editingNote, subject: e.target.value})
                    : setNoteForm({...noteForm, subject: e.target.value})
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <textarea
                  placeholder="Escribe tu nota aquí..."
                  value={editingNote ? editingNote.content : noteForm.content}
                  onChange={(e) => editingNote
                    ? setEditingNote({...editingNote, content: e.target.value})
                    : setNoteForm({...noteForm, content: e.target.value})
                  }
                  rows="6"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                {editingNote ? (
                  <div className="flex gap-2">
                    <button
                      onClick={updateNote}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setEditingNote(null)}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={addNote}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Agregar Nota
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {(userData.notes || []).map(note => (
                <div key={note.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{note.title}</h4>
                      {note.subject && (
                        <span className="text-sm text-purple-600 font-medium">{note.subject}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingNote(note)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap mb-2">{note.content}</p>
                  <p className="text-xs text-gray-500">{note.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resto del código de tareas, horario y metas... */}
      </div>
    </div>
  );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StudentStudyPlatform />);
