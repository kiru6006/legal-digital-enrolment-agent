import React, { useState } from 'react';
import { Users, Shield, UserCheck, CheckCircle2, Plus } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';
import { User, UserRole } from '../../types/user';
import { useAEMS } from '../../store/applicationStore';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';

export const AdminUsers: React.FC = () => {
  const { currentRole, switchRole } = useAEMS();
  const [usersList, setUsersList] = useState<User[]>(mockUsers);

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">Demo User &amp; Role Management</h1>
        <p className="text-xs text-slate-500">
          Configure demo accounts, statutory officer designations, and authorization privileges.
        </p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Configured Demo User Identities ({usersList.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4 text-right">Switch Active Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{u.designation}</td>
                    <td className="py-3 px-4 text-slate-500">{u.department || 'Enrolment Office'}</td>
                    <td className="py-3 px-4">
                      <Badge
                        size="sm"
                        variant={
                          u.role === 'officer'
                            ? 'primary'
                            : u.role === 'management'
                            ? 'warning'
                            : u.role === 'committee'
                            ? 'danger'
                            : u.role === 'admin'
                            ? 'neutral'
                            : 'violet'
                        }
                      >
                        {u.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant={currentRole === u.role ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => handleRoleSwitch(u.role)}
                        className="text-xs"
                      >
                        {currentRole === u.role ? 'Active Role' : 'Switch &rarr;'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
