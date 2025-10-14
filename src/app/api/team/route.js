
import { NextResponse } from 'next/server';

const team = [
  {
    id: 1,
    name: 'Smit Akhani',
    role: 'Full Stack Developer',
    avatar: 'https://avatars.githubusercontent.com/u/102832059?v=4',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
];

export async function GET() {
  return NextResponse.json(team);
}
