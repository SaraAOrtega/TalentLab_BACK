import Proyecto from '../models/proyectos.models';
import Personaje from '../models/personajes.models';
import User from '../models/user.models';

// ... otros imports ...

function initializeAssociations() {
  Proyecto.associate({ Personaje, User });
  Personaje.associate({ Proyecto });


}

// Llama a esta función después de inicializar tus modelos
initializeAssociations();