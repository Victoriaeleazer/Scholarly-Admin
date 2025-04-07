import React, {useState} from "react";
import {Mentee} from "../../../interfaces/mentee";
import formatDate from "../../../utils/DateFormat";
import {SearchNormal1} from "iconsax-react";
import {useNavigate} from "react-router";
import ProfileIcon from "../../../components/ProfileIcon";
import OverlappingImages from "../../../components/OverlappingImages";

interface Props {
    mentees: Mentee[];
}

export default function MenteesList({mentees}: Props) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    // Filter mentees based on the search term
    const filteredMentees = mentees.filter((mentee) =>
        mentee.menteeTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openMenteePage = (menteeId: string) => {
        navigate(`/dashboard/mentees/${menteeId}`);
        };
    

        return (
            <div className="text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8">
              {/* <!-- Title and Search Bar in the Same Line --> */}
              <div className="flex justify-between items-center flex-wrap">
                <h1 className="text-3xl font-bold text-white">Mentee List</h1>
        
                {/* <!-- Search Bar --> */}
                <div className="relative w-full sm:w-80 bg-tertiary rounded-lg flex flex-center mt-4 sm:mt-0">
                  <input 
                    type="text" 
                    placeholder="Search for events..." 
                    className="w-full px-4 py-3.5 pl-10 text-secondary text-[13.5px] open-sans rounded-lg outline-none bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {/* <!-- Search Icon (Optional) --> */}
                  <SearchNormal1 size={18} className="absolute left-3 text-secondary" />
                </div>
              </div>
        
              {/* <!-- Table --> */}
              <div className="overflow-x-auto bg-tertiary shadow-md rounded-2xl">
                <table className="w-full h-fit rounded-lg border-separate border-spacing-0 overflow-hidden">
                  <thead className="pl-5 py-3 h-[60px] border-b">
                    <tr className="text-white text-left text-[14px] font-bold">
                      <th className="px-4  py-2">Title</th>
                      <th className="px-4 text-center py-2">Description</th>
                      <th className="px-4 text-center py-2">Designated Time</th>
                      <th className="px-4 text-center py-2">Created Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-[15px]">
                    {filteredMentees.map((mentee, index) => (
                      <tr
                        key={mentee.id}
                        className="border-0 odd:bg-background hover:bg-purple hover:bg-opacity-30 transition-colors ease duration-400 text-white cursor-pointer"
                        onClick={() => openMenteePage(mentee.id)}
                      >
                        {/* <td className="px-4 py-4">
                          <div className="flex items-center">
                            <ProfileIcon profile={mentee.menteePhoto} className="w-8 h-8 mr-2" width={"32px"} height={"32"} />
                            <p>{mentee.eventTitle}</p>
                          </div>
                        </td> */}

                        {/* <td className="px-4 py-2">{mentee.Description}</td>
                        <td className="px-4 py-2">{formatDate(mentee.designatedTime, true)}</td>
                        <td className="px-4 py-2">{formatDate(mentee.createdTime, false)}</td> */}
                        <td className="px-4 py-2">
                          <div className="flex flex-center">
                            <OverlappingImages outlineColor={index % 2 ? 'var(--tertiary)' : 'var(--background)'} images={(event.audience as Member[]).map(aud => aud.profile ?? { color: aud.color, fullName: `${aud.firstName} ${aud.lastName}` })} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
    }