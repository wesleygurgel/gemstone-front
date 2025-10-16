import { useTranslation } from 'react-i18next';
import { BR, ES, FR, SA } from 'country-flag-icons/react/3x2';

// Lista de idiomas SEM o inglês, pois é o padrão
const availableLangs = [
  { code: 'pt-BR', label: 'PT', Icon: BR },
  { code: 'es',    label: 'ES', Icon: ES },
  { code: 'fr',    label: 'FR', Icon: FR },
  { code: 'ar',    label: 'AR', Icon: SA },
];

export default function LangSwitcher({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  // Se o idioma ativo não for inglês, ele aparecerá na lista para que se possa voltar
  // Se for inglês, todos os outros aparecerão.
  const visibleLangs = i18n.resolvedLanguage === 'en'
    ? availableLangs
    : availableLangs.filter(lang => !i18n.resolvedLanguage?.startsWith(lang.code.split('-')[0]));


  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {visibleLangs.map(({ code, label, Icon }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className="flex items-center gap-1.5 px-2 py-1 rounded border text-white border-white/30 hover:bg-white/10 transition"
          aria-label={`Mudar idioma para ${label}`}
        >
          <Icon className="w-5 h-auto rounded-sm" />
          <span className="text-xs font-bold">{label}</span>
        </button>
      ))}
       {/* Botão para voltar para o Inglês, caso não seja o idioma ativo */}
       {i18n.resolvedLanguage !== 'en' && (
        <button
            onClick={() => changeLanguage('en')}
            className="flex items-center gap-1.5 px-2 py-1 rounded border text-white border-white/30 hover:bg-white/10 transition"
            aria-label={`Switch language to English`}
        >
            <span className="text-xs font-bold">EN</span>
        </button>
       )}
    </div>
  );
}

// export default function LangSwitcher({ className = '' }: { className?: string }) {
//   const { i18n } = useTranslation();
//   return (
//     <div className={`flex items-center gap-2 ${className}`}>
//       {langs.map(l => (
//         <button
//           key={l.code}
//           onClick={() => i18n.changeLanguage(l.code)}
//           className={`px-2 py-1 rounded text-xs border transition
//             ${i18n.resolvedLanguage?.startsWith(l.code) ? 'bg-white text-black' : 'text-white border-white/30 hover:bg-white/10'}`}
//           aria-pressed={i18n.resolvedLanguage?.startsWith(l.code)}
//           aria-label={`Switch language to ${l.label}`}
//         >
//           {l.label}
//         </button>
//       ))}
//     </div>
//   );
// }


