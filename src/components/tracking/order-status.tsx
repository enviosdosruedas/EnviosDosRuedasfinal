interface OrderStatusProps {
  status: string;
  estimatedArrival: string;
  timeRemaining: string;
}

export function OrderStatus({ status, estimatedArrival, timeRemaining }: OrderStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {status}
        </h1>
        <div className="text-gray-600 mb-1">
          <span className="text-sm">Llegada estimada a las </span>
          <span className="font-semibold text-lg">{estimatedArrival}</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {timeRemaining}
        </div>
      </div>
    </div>
  );
}
