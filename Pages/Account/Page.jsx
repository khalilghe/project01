import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function Account({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    password: '',
    passwordConfirmation: '',
    speciality: user.speciality,
    profilePhoto: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/update-profile', {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setIsEditing(false),
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setData('profilePhoto', e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Profile</h1>

      <div className="mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="rounded-full object-cover w-full h-full"
          />
          <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{user.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Family Name</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{user.familyName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{user.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Speciality</label>
          {isEditing ? (
            <input
              type="text"
              value={data.speciality}
              onChange={e => setData('speciality', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          ) : (
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.speciality}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={data.passwordConfirmation}
              onChange={e => setData('passwordConfirmation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

