import Image from "next/image";

export function TrackingHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Image
              src="https://ext.same-assets.com/2423591613/1643727609.png"
              alt="Mensajería Envíos DosRuedas"
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Mensajería Envíos DosRuedas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
