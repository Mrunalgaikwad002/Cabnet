import WalletOverview from './WalletOverview';
import PaymentMethods from './PaymentMethods';
import TransactionsList from './TransactionsList';
import OffersRefunds from './OffersRefunds';

export default function PaymentsPanel() {
  return (
    <div className="space-y-6">
      <WalletOverview />
      <PaymentMethods />
      <TransactionsList />
      <OffersRefunds />
    </div>
  );
}


