import { Button } from '@/components/button/Button';
import ConnectWalletModal from '@/components/modal/ConnectWalletModal';
import { useModal } from '@/context/ModalContext';
import WalletIcon from '@/icons/WalletIcon';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

type INavbarProps = {
  logo: ReactNode;
  mode?: string;
  fixed?: boolean;
};

const Header = (props: INavbarProps) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isOpenConnectWallet, toggleConnectWallet } = useModal();

  const handleConnectWallet = () => {
    if (!isConnected) {
      toggleConnectWallet();
      return;
    }
    disconnect();
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={classNames(
          'header h-[80px] items-center flex fixed w-full z-10 transition-all duration-100 easeLinear ',
          scrolled || isHovered || !props.fixed
            ? 'bg-[#0A071E]'
            : 'bg-[#0A071E] lg:bg-transparent hover:bg-[#0A071E] '
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="m-auto w-full flex flex-wrap items-center justify-between px-4 lg:px-20  max-w-[1440px]">
          <nav className='mr-0 ml-auto'>
            <ul className="navbar flex items-center text-sm lg:text-xl font-medium text-white">
              <>
                <Button
                  icon={<WalletIcon />}
                  className="px-4"
                  onClick={handleConnectWallet}
                >
                  {isConnected && address
                    ? address.slice(0, 5) + '...' + address.slice(37, 42)
                    : 'Connect Wallet'}
                </Button>
              </>
            </ul>
          </nav>
        </div>
      </div>
      <ConnectWalletModal
        isOpen={isOpenConnectWallet}
        toggleOpen={toggleConnectWallet}
      />
    </>
  );
};

export { Header };
