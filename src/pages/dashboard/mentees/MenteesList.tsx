import React, {useState} from "react";
import {Mentee} from "../../../interfaces/Mentee";
import formatDate from "../../../utils/DateFormat";
import {SearchNormal1} from "iconsax-react";
import {useNavigate} from "react-router";
import ProfileIcon from "../../../components/ProfileIcon";
import OverlappingImages from "../../../components/OverlappingImages";
import { useMentees } from "../../../provider/MenteesProvider";
import { useMemo } from "react";



export default function MenteesList() {
    const {mentees} = useMentees();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    // Filter mentees based on the search term
    const filteredMentees = useMemo(()=>{
      return  mentees.filter((mentee) =>
        mentee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || mentee.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    }, [mentees, searchTerm])


    const getColor = (mentee: Mentee)=>{
      const status = mentee.status;
      if(status === 'new'){
        return 'bg-blue-500'
      }else if(status === 'pending'){
        return 'bg-yellow-500'
      }else if(status === 'confirmed'){
        return 'bg-green-500'
      }else{
        return 'bg-red-500'
      }
    }

    const getTextColor = (mentee: Mentee)=>{
      const status = mentee.status;
      if(status === 'new'){
        return 'text-blue-500'
      }else if(status === 'pending'){
        return 'text-yellow-500'
      }else if(status === 'confirmed'){
        return 'text-green-500'
      }else{
        return 'text-red-500'
      }
    }

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
                      <th className="px-4  py-2">Name</th>
                      <th className="px-4 text-center py-2">Email</th>
                      <th className="px-4 text-center py-2">Phone Number</th>
                      <th className="px-4 text-center py-2">Status</th>
                      <th className="px-4 text-center py-2">Created Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    {filteredMentees.map((mentee, index) => (
                      <tr
                        key={mentee.id}
                        className="border-0 odd:bg-background hover:bg-purple hover:bg-opacity-30 transition-colors ease duration-400 text-white cursor-pointer"
                        onClick={() => openMenteePage(mentee.id)}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <ProfileIcon member={mentee} className="w-8 h-8 mr-2" width={"32px"} height={"32"} />
                            <p>{mentee.firstName + " " + mentee.lastName}</p>
                          </div>
                        </td>

                        <td className="px-4 py-2">
                              {mentee.email ?? "mitchellotonekwu@gmail.com"}
                        </td>

                        <td className="px-4 py-2">
                              {mentee.phoneNumber ?? "09123456789"}
                        </td>

                        <td className="px-4 py-2 h-full flex flex-center">
                          <p className={`${getTextColor(mentee)} w-fit px-2 py-1 bg-opacity-10 rounded-[20px] ${getColor(mentee)}`}> 
                                {mentee.status }
                              </p>
                          </td>
                        <td className="px-4 py-2">
                        <p> 
                              {mentee.createdTime ? formatDate(mentee.createdTime, false) : "N/A"}
                            </p>
                        </td>

                        {/* { <td className="px-4 py-2">{formatDate(mentee.designatedTime, true)}</td>
                        <td className="px-4 py-2">{formatDate(mentee.createdTime, false)}</td>
                        <td className="px-4 py-2">
                          <div className="flex flex-center">
                            <OverlappingImages outlineColor={index % 2 ? 'var(--tertiary)' : 'var(--background)'} images={(event.audience as Member[]).map(aud => aud.profile ?? { color: aud.color, fullName: `${aud.firstName} ${aud.lastName}` })} />
                          </div>
                        </td> } */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
    }