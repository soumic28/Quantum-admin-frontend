
import { SidebarButton } from './sidebar-button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Button } from '../../ui';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}
export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
  }>;
  extras?: ReactNode;
}
export function SidebarDesktop(props: SidebarDesktopProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r'>
      <div className='h-full px-3 py-4'>
        <h3 className='mx-3 text-lg font-semibold text-foreground'>Quantum</h3>
        <div className='mt-5'>
          <div className='flex flex-col gap-1 w-full'>
            {props.sidebarItems.links.map((link, index) => (
                <SidebarButton
                  variant={location.pathname == link.href ?'secondary' :'ghost'}
                  className='w-full'
                  key={index}
                  onClick={() => {navigate(`${link.href}`)}}
                >
                  {link.label}
                </SidebarButton>
            ))}
            <div className="flex mt-10 justify-center">
                <Button variant="secondary" size="lg" onClick={()=>{ 
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("role");
                    navigate("/login")
                }}>Logout</Button>    
            </div>    
            <div className='text-accent-foreground text-[11px] absolute bottom-5'>
                <h1>© 2024 Quantum • All rights reserved</h1>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}