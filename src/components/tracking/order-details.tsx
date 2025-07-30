interface OrderSummary {
  items: number;
  subtotal: string;
  total: string;
}

interface OrderDetailsProps {
  orderId: string;
  orderSummary: OrderSummary;
}

export function OrderDetails({ orderId, orderSummary }: OrderDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Detalles del Pedido
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Pedido {orderId}</span>
          <span className="text-sm text-gray-600">({orderSummary.items} artículos)</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600">Total parcial:</span>
          <span className="text-sm font-medium text-gray-900">{orderSummary.subtotal}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-t border-gray-100">
          <span className="text-base font-semibold text-gray-900">Total del pedido:</span>
          <span className="text-base font-semibold text-gray-900">{orderSummary.total}</span>
        </div>
      </div>
    </div>
  );
}
