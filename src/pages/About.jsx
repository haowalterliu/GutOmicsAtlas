import Placeholder from '../components/Placeholder'

const teamMembers = [
  { name: 'J. Jeya Vandana, B.Sc.', title: 'Graduate Student', email: 'jjv4001@med.cornell.edu' },
  { name: 'Dongliang Leng, PhD.', title: 'Postdoc', email: 'dol4005@med.cornell.edu' },
  { name: 'Tiancheng Jiao', title: 'Undergraduate Student', email: 'tcjiao@umich.edu' },
  { name: 'Ricky Han, B.S.', title: 'Graduate Student (Bioinformatics)', email: 'rickyhan@umich.edu' },
  { name: 'Yuanhao Huang', title: 'Graduate Student', email: 'hyhao@umich.edu' },
  { name: 'Kevin Chang', title: 'Undergraduate Student', email: 'kvchang@umich.edu' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-10 py-10">
      {/* Lab introduction */}
      <div className="mb-14 grid grid-cols-2 gap-10">
        <div>
          <h2 className="mb-5 text-[28px] font-bold tracking-tight text-[#1A1A1A]">
            Welcome to Shuibing Chen Laboratory!
          </h2>
          <p className="mb-5 text-[15px] leading-[1.7] text-[#6B7280]">
            The major research interest in the Chen Laboratory is to apply human pluripotent stem cell (hPSC)-derived cells/organoids to model human diseases and perform drug screens toward development of novel therapeutics. We have identified many small molecules controlling stem cell fate decision using high throughput/content chemical screens. By combining gene targeting, directed differentiation, human organoids, and humanized mouse models, we have established several unique models to systematically explore the role of genetic and/or environmental factors in disease progression. We establish proof-of-principle that &ldquo;disease in a dish&rdquo; models that can be adapted to high throughput/content screening platforms and to discover drug candidates for precision therapy.
          </p>
          <p className="text-[13px] text-[#9CA3AF]">
            If you have any questions about this website, please don&apos;t hesitate to contact anyone of the members below!
          </p>
        </div>
        <div className="rounded-[20px] bg-[#F5F5F5] p-6">
          <Placeholder text="hPSC Research Cycle Diagram" height="300px" />
        </div>
      </div>

      {/* Team members */}
      <div className="flex flex-col gap-1">
        {teamMembers.map((member, idx) => (
          <div
            key={member.email}
            className={`flex gap-5 rounded-[16px] px-6 py-5 ${
              idx % 2 === 1 ? 'bg-[#F9FAFB]' : ''
            }`}
          >
            {/* Photo placeholder */}
            <div className="h-16 w-16 flex-shrink-0 rounded-full bg-[#F5F5F5]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] font-bold text-[#1A1A1A]">{member.name}</span>
              <span className="text-[13px] text-[#9CA3AF]">{member.title}</span>
              <a
                href={`mailto:${member.email}`}
                className="text-[14px] text-[#1A1A1A] no-underline hover:underline"
              >
                {member.email}
              </a>
              <span className="mt-1 text-[14px] leading-relaxed text-[#6B7280]">Bio coming soon.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
