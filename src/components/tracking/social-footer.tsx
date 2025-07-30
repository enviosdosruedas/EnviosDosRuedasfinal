import Image from "next/image";

export function SocialFooter() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: "https://ext.same-assets.com/2423591613/416928015.svg",
      url: "#"
    },
    {
      name: "Instagram",
      icon: "https://ext.same-assets.com/2423591613/2685275487.svg",
      url: "#"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Síguenos en
        </h3>

        <div className="flex justify-center space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
              title={`Síguenos en ${social.name}`}
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
