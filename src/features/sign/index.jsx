/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteSign, getSignsContent } from "./signSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm loại xử phạt",
        bodyType: MODAL_BODY_TYPES.FINE_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Thêm
      </button>
    </div>
  );
};

function Sign() {
  const { signs } = useSelector((state) => state.sign);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    dispatch(getSignsContent());
    console.log("signs", signs);
  }, [isChange]);

  const deleteCurrentDecree = (index, _id) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá nghị định này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.DECREE_DELETE,
          _id,
          index,
        },
      })
    );
  };

  const editCurrentDecree = (index, id, name, number) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa nghị định",
        bodyType: MODAL_BODY_TYPES.DECREE_EDIT,
        extraObject: {
          id,
          name,
          number,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách biển báo"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Giải thích</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {signs?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td>{l.SignName}</td>
                    <td>
                      <img
                        src={l.SignImage}
                        alt="sign"
                        className="h-24 w-24 object-cover"
                      />
                    </td>
                    <td className="max-w-sm">{l.SignExplanation}</td>
                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/decree/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          editCurrentDecree(
                            k,
                            l.Id,
                            l.DecreeName,
                            l.DecreeNumber
                          )
                        }
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentDecree(k, l.Id)}
                      >
                        <ArchiveBoxArrowDownIcon className="w-5 text-red-700" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Sign;