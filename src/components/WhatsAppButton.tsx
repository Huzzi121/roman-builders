"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923139986707?text=Assalamualaikum%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.%20I%20would%20like%20to%20discuss%20a%20project%20and%20get%20more%20information%20about%20your%20services%2C%20pricing%2C%20and%20process.%20Please%20let%20me%20know%20when%20you%27re%20available%20to%20discuss.%20Thank%20you%21"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[999] group"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"></span>
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.77L0 32l8.469-2.003A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.14 22.86c-.34.955-1.99 1.825-2.74 1.938-.7.105-1.585.15-2.557-.16-.59-.19-1.347-.443-2.314-.867-4.07-1.757-6.724-5.843-6.926-6.113-.202-.27-1.642-2.185-1.642-4.17s1.04-2.96 1.41-3.366c.37-.406.806-.507 1.074-.507.27 0 .538.002.773.013.248.012.58-.094.908.693.34.81 1.156 2.796 1.258 2.998.1.202.168.438.033.706-.134.27-.202.437-.403.673-.202.236-.425.527-.606.708-.202.2-.412.417-.177.818.235.4 1.044 1.72 2.24 2.786 1.54 1.372 2.838 1.796 3.24 2 .4.202.633.168.868-.1.235-.27 1.007-1.176 1.275-1.58.27-.403.538-.336.908-.202.37.134 2.348 1.107 2.75 1.31.4.202.667.302.767.47.1.168.1.977-.24 1.932z"/>
        </svg>
      </div>
    </a>
  );
}
