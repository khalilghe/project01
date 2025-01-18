import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import ProjectDetailsForm from './ProjectDetailsForm';

export default function ProjectViewModal({ isOpen, onClose, project: initialProject }) {
  const [isEditing, setIsEditing] = useState(false);
  const [project, setProject] = useState(initialProject);

  const handleSave = (updatedProject) => {
    setProject(updatedProject);
    setIsEditing(false);
    // Here you would typically make an API call to update the project
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Project Details
                  </h3>
                  <div className="flex items-center gap-4">
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </Dialog.Title>

                <ProjectDetailsForm
                  project={project}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

