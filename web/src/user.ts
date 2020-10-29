import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const urlParams = new URLSearchParams(window.location.search);
const userParam = urlParams.get('id') || '1';
const userIdParsed = parseInt(userParam);
const userId = typeof userIdParsed === 'number' ? userIdParsed : 1;

const user = User.buildUser({ id: userId });
user.fetch();

const root = document.getElementById('root');

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error('Root element not found');
}