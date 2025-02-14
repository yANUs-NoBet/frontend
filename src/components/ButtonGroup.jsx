import { ShieldCheck, BarChart2, Settings, Flag, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ButtonGroup() {
  const navigate = useNavigate();

  return (
    <div className="button-group">
      <button onClick={() => navigate('/add-white')}>
        <ShieldCheck size={18} color="red" /> 차단 제외 사이트 추가
      </button>
      <button>
        <BarChart2 size={18} color="green" /> 필터링 로그 열기
      </button>
      <button>
        <Flag size={18} color="orange"/> 문제 신고하기
      </button>
      <button>
        <Globe size={18} color="grey" /> 도박 중독 치료 센터
      </button>
    </div>
  );
}
