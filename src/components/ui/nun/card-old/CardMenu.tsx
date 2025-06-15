import { Fragment } from 'react';
import { classNames } from '@/utils';
import { EllipsisVerticalIcon as DotsVerticalIcon } from '@heroicons/react/24/solid';

/* This example requires Tailwind CSS v2.0+ */
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { UiPortal } from '@ui/ui-portal';

export function Example() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </MenuButton>
            </div>

            <Transition
                as={Fragment}

                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"

                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="">
                    <UiPortal>
                        <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <MenuItem>
                                    {({ focus }) => (
                                        <a href="#" className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                            Account settings
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <a href="#" className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                            Support
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <a href="#" className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                            License
                                        </a>
                                    )}
                                </MenuItem>
                                <form method="POST" action="#">
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button type="submit" className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm')}>
                                                Sign out
                                            </button>
                                        )}
                                    </MenuItem>
                                </form>
                            </div>
                        </MenuItems>
                    </UiPortal>
                </div>
            </Transition>

        </Menu>
    );
}

export function CardMenu() {
    return <Example />;
}
