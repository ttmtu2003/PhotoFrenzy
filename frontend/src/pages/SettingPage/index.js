import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../../components/NavBar/NavBar';
import useUpdateUser from './hooks/useUpdateUser';
import useDeleteUser from './hooks/useDeleteUser';

const SettingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading: isUpdating, error: updateError, updateUser } = useUpdateUser();
  const { isLoading: isDeleting, error: deleteError, isDeleted, deleteUser } = useDeleteUser();

  const userId = window.localStorage.getItem('id')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    if (!username && !password) {
      return;
    }
    const response = await updateUser(username, password, userId);
    window.localStorage.setItem('isAuthed', false)
    window.location.href = '/login'
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('userData')
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const response = await deleteUser(userId);
    // window.localStorage.setItem('isAuthed', false)
    // window.location.href = '/login'
    // window.localStorage.removeItem('token')
    // window.localStorage.removeItem('id')
    // window.localStorage.removeItem('userData')
  };

  return (
    <>
      <UserNavbar className='mb-3' />
      <div className='t-mt-[1rem] t-p-[4rem]'>
        <h1 className="t-font-bold t-text-[1.5rem] mt-3 mb-4">Settings</h1>
        <Form className="t-bg-white t-p-[3rem] rounded" onSubmit={handleUpdateSubmit}>
          <FormGroup>
            <Label for="username">New Username</Label>
            <Input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">New Password</Label>
            <Input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
          </FormGroup>
          <div className='!t-mt-[2rem] t-w-full t-flex t-justify-end'>
          <Button className='t-text-[#ea1e1e] hover:t-text-white t-bg-white t-border-[#ea1e1e] hover:t-bg-[#ea1e1e]' disabled={isDeleting} onClick={handleDeleteSubmit}>Delete Account</Button>
            <Button className='t-text-[#098DED] hover:t-text-white t-bg-white t-border-[#098DED] hover:t-bg-[#098DED] t-ml-[1rem]' disabled={isUpdating}>Update</Button>
          </div>
        </Form>
        {updateError && <p className="t-text-red">{updateError.message}</p>}
        {deleteError && <p className="t-text-red">{deleteError.message}</p>}
        {isDeleted && <p className="t-text-green">Account has been deleted.</p>}
      </div>
    </>
  );
};

export default SettingPage;