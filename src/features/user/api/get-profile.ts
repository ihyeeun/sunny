import supabase from "@shared/lib/supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile") //어떤 테이블에서 데이터를 불러올 것인지
    .select("*") // 어떤 컬럼들의 데이터를 불러올 건지 설정
    .eq("id", userId) // equal 메소드를 호출해서 동일한 데이터만 불러오기
    .single(); // 조건들에 일치하는 단 하나의 데이터만 불러오기

  if (error) throw error;
  return data;
}
