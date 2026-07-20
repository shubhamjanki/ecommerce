import { useState } from 'react';
import { User as UserIcon, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Account Settings</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">{user.role}</span>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full name</Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <Button onClick={() => toast.success('Profile updated')}>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Password</CardTitle>
            <CardDescription>Change your password regularly to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current password</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <Label>New password</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="outline" onClick={() => toast.success('Password updated')}>Update password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Two-factor authentication is not enabled. Consider enabling it for extra security.</p>
            <Button variant="outline" className="mt-3" onClick={() => toast.info('2FA setup would start here')}>Enable 2FA</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
