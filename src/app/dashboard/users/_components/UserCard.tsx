"use client";

import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import UserUpdateModal from "./UserRoleUpdateModal";

export default function UserCard({ user }: { user: UserResponse }) {
  const session = useSession();
  const [roleUpdateModal, setRoleUpdateModal] = useState(false);

  return (
    <>
      <div className="border-b border-black w-full grid grid-cols-4 items-center p-4 gap-2">
        <p className="text-base font-semibold">{user.name}</p>
        <p className="text-base font-semibold">{user.email}</p>
        <p className="text-base font-semibold">{user.role}</p>

        <p className="text-base font-semibold text-center">
          {session.data?.user.role == "Developer" && (
            <>
              <Edit className="w-full text-gray-900" />
              <span className="text-gray-900 opacity-50 text-sm">
                Yetkiniz yok
              </span>
            </>
          )}
          {session.data?.user.role !== "Developer" && (
            <Edit
              className="w-full text-indigo-600"
              onClick={() => setRoleUpdateModal(true)}
            />
          )}
        </p>
      </div>
      <UserUpdateModal
        user={user}
        roleUpdateModal={roleUpdateModal}
        setRoleUpdateModal={setRoleUpdateModal}
      />
    </>
  );
}
