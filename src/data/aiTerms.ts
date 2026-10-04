export interface AITerm {
  id: number;
  term: string;
  ipa: string;
  vietnameseTerm: string;
  category: string;
  definition: string;
  example: string;
  exampleVi: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
}

export const AI_TERMS: AITerm[] = [
  {
    id: 1,
    term: "Artificial Intelligence",
    ipa: "/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/",
    vietnameseTerm: "Trí tuệ nhân tạo",
    category: "Khái niệm cốt lõi",
    definition: "Khả năng của máy tính hoặc hệ thống số mô phỏng tư duy, học hỏi và giải quyết vấn đề tương tự con người.",
    example: "Artificial Intelligence is transforming modern healthcare diagnostics.",
    exampleVi: "Trí tuệ nhân tạo đang làm thay đổi căn bản chẩn đoán y tế hiện đại.",
    level: "Cơ bản"
  },
  {
    id: 2,
    term: "Machine Learning",
    ipa: "/məˈʃiːn ˈlɜː.nɪŋ/",
    vietnameseTerm: "Học máy",
    category: "Thuật toán & Mô hình",
    definition: "Nhánh của AI tập trung vào việc phát triển các thuật toán có khả năng tự cải thiện hiệu suất từ dữ liệu mà không cần lập trình tường minh.",
    example: "Machine Learning models improve their accuracy automatically through experience and training data.",
    exampleVi: "Các mô hình học máy tự động cải thiện độ chính xác thông qua kinh nghiệm và dữ liệu huấn luyện.",
    level: "Cơ bản"
  },
  {
    id: 3,
    term: "Deep Learning",
    ipa: "/diːp ˈlɜː.nɪŋ/",
    vietnameseTerm: "Học sâu",
    category: "Mạng nơ-ron",
    definition: "Tập con của học máy dựa trên mạng nơ-ron nhân tạo nhiều tầng, có khả năng xử lý lượng dữ liệu phi cấu trúc khổng lồ.",
    example: "Deep Learning powers cutting-edge facial recognition and autonomous driving systems.",
    exampleVi: "Học sâu cung cấp sức mạnh cho các hệ thống nhận dạng khuôn mặt và xe tự hành tiên tiến nhất.",
    level: "Trung cấp"
  },
  {
    id: 4,
    term: "Neural Network",
    ipa: "/ˈnjʊə.rəl ˈnet.wɜːk/",
    vietnameseTerm: "Mạng nơ-ron nhân tạo",
    category: "Kiến trúc mô hình",
    definition: "Hệ thống điện toán mô phỏng cách thức các tế bào thần kinh sinh học trong não người liên kết và truyền tín hiệu.",
    example: "An artificial neural network transmits signals across multiple hidden layers of interconnected nodes.",
    exampleVi: "Mạng nơ-ron nhân tạo truyền tín hiệu qua nhiều tầng ẩn gồm các nút liên kết với nhau.",
    level: "Trung cấp"
  },
  {
    id: 5,
    term: "Natural Language Processing",
    ipa: "/ˈnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ ˈprəʊ.ses.ɪŋ/",
    vietnameseTerm: "Xử lý ngôn ngữ tự nhiên (NLP)",
    category: "Ngôn ngữ & Giao tiếp",
    definition: "Lĩnh vực nghiên cứu giúp máy tính thấu hiểu, phân tích, diễn giải và sản sinh ngôn ngữ con người một cách tự nhiên.",
    example: "Natural Language Processing allows virtual assistants to comprehend spoken commands accurately.",
    exampleVi: "Xử lý ngôn ngữ tự nhiên cho phép các trợ lý ảo thấu hiểu các khẩu lệnh bằng giọng nói một cách chính xác.",
    level: "Trung cấp"
  },
  {
    id: 6,
    term: "Large Language Model",
    ipa: "/lɑːdʒ ˈlæŋ.ɡwɪdʒ ˈmɒd.əl/",
    vietnameseTerm: "Mô hình ngôn ngữ lớn (LLM)",
    category: "AI Tạo sinh",
    definition: "Mô hình AI học sâu được huấn luyện trên kho dữ liệu văn bản đồ sộ, có khả năng sinh văn bản và tương tác như con người.",
    example: "A Large Language Model can generate coherent essays and synthesize technical software code.",
    exampleVi: "Mô hình ngôn ngữ lớn có thể viết ra các bài luận mạch lạc và tổng hợp mã nguồn phần mềm kỹ thuật.",
    level: "Nâng cao"
  },
  {
    id: 7,
    term: "Computer Vision",
    ipa: "/kəmˈpjuː.tə ˈvɪʒ.ən/",
    vietnameseTerm: "Thị giác máy tính",
    category: "Nhận thức & Thị giác",
    definition: "Lĩnh vực cho phép máy tính thu thập, xử lý và diễn giải thông tin trực quan từ hình ảnh hoặc video kỹ thuật số.",
    example: "Computer Vision enables security systems to detect obstacles and verify identities in real time.",
    exampleVi: "Thị giác máy tính cho phép hệ thống an ninh phát hiện vật cản và xác minh danh tính theo thời gian thực.",
    level: "Trung cấp"
  },
  {
    id: 8,
    term: "Generative AI",
    ipa: "/ˈdʒen.ər.ə.tɪv eɪ aɪ/",
    vietnameseTerm: "Trí tuệ nhân tạo tạo sinh",
    category: "AI Tạo sinh",
    definition: "Công nghệ AI có khả năng sáng tạo ra các nội dung hoàn toàn mới như văn bản, hình ảnh, âm thanh, video hay mã code.",
    example: "Generative AI produces original high-resolution imagery and creative writing in mere seconds.",
    exampleVi: "AI tạo sinh sản xuất hình ảnh độ phân giải cao độc bản và sáng tác bài viết chỉ trong vài giây.",
    level: "Cơ bản"
  },
  {
    id: 9,
    term: "Supervised Learning",
    ipa: "/ˈsuː.pə.vaɪzd ˈlɜː.nɪŋ/",
    vietnameseTerm: "Học có giám sát",
    category: "Phương pháp học",
    definition: "Phương pháp huấn luyện thuật toán học máy bằng cách cung cấp tập dữ liệu đã được gán nhãn kết quả chính xác.",
    example: "In supervised learning, the algorithm maps input features to target labels using verified training datasets.",
    exampleVi: "Trong học có giám sát, thuật toán ánh xạ các đặc trưng đầu vào tới nhãn mục tiêu dựa trên dữ liệu đã gán nhãn.",
    level: "Trung cấp"
  },
  {
    id: 10,
    term: "Reinforcement Learning",
    ipa: "/ˌriː.ɪnˈfɔː.smənt ˈlɜː.nɪŋ/",
    vietnameseTerm: "Học tăng cường",
    category: "Phương pháp học",
    definition: "Phương pháp huấn luyện dựa trên thử và sai, nơi tác tử (agent) học cách đưa ra chuỗi quyết định tối ưu thông qua phần thưởng và hình phạt.",
    example: "Reinforcement Learning trains autonomous agents to master complex strategy games and robotic maneuvers.",
    exampleVi: "Học tăng cường huấn luyện các tác tử tự hành thành thạo trò chơi chiến thuật phức tạp và điều khiển robot.",
    level: "Nâng cao"
  },
  {
    id: 11,
    term: "Transformer",
    ipa: "/trænzˈfɔː.mər/",
    vietnameseTerm: "Kiến trúc Transformer",
    category: "Kiến trúc mô hình",
    definition: "Kiến trúc mạng nơ-ron đột phá sử dụng cơ chế tự chú ý (self-attention), nền móng của hầu hết các mô hình LLM hiện đại.",
    example: "The Transformer architecture fundamentally revolutionized sequence modeling by processing entire sentences simultaneously.",
    exampleVi: "Kiến trúc Transformer đã cách mạng hóa việc mô hình chuỗi bằng cách xử lý đồng thời toàn bộ câu văn.",
    level: "Nâng cao"
  },
  {
    id: 12,
    term: "Hallucination",
    ipa: "/həˌluː.sɪˈneɪ.ʃən/",
    vietnameseTerm: "Ảo giác mô hình (Thông tin sai lệch)",
    category: "Hành vi mô hình",
    definition: "Hiện tượng mô hình AI sinh ra thông tin có vẻ rất tự tin và hợp lý nhưng thực chất là sai sự thật hoặc không có căn cứ.",
    example: "Engineers apply retrieval techniques to minimize hallucination in mission-critical applications.",
    exampleVi: "Các kỹ sư áp dụng kỹ thuật tìm kiếm thông tin để giảm thiểu ảo giác trong các ứng dụng quan trọng.",
    level: "Trung cấp"
  },
  {
    id: 13,
    term: "Fine-tuning",
    ipa: "/faɪn ˈtjuː.nɪŋ/",
    vietnameseTerm: "Tinh chỉnh mô hình",
    category: "Huấn luyện chuyên biệt",
    definition: "Quá trình lấy một mô hình đã được huấn luyện sẵn và tiếp tục huấn luyện trên bộ dữ liệu nhỏ hơn để phục vụ tác vụ chuyên biệt.",
    example: "Fine-tuning a base foundation model with legal corpora enhances its contractual analysis capability.",
    exampleVi: "Tinh chỉnh một mô hình nền tảng bằng ngữ liệu pháp lý giúp nâng cao năng lực phân tích hợp đồng của nó.",
    level: "Nâng cao"
  },
  {
    id: 14,
    term: "Prompt Engineering",
    ipa: "/prɒmpt ˌen.dʒɪˈnɪə.rɪŋ/",
    vietnameseTerm: "Kỹ nghệ thiết kế câu lệnh",
    category: "Tương tác & Chỉ dẫn",
    definition: "Kỹ thuật tối ưu hóa và cấu trúc lời nhắc (prompt) đưa vào AI để nhận được câu trả lời chính xác, chất lượng và phù hợp nhất.",
    example: "Effective prompt engineering specifies contextual roles and format constraints to ensure reliable outputs.",
    exampleVi: "Kỹ nghệ câu lệnh hiệu quả chỉ định vai trò ngữ cảnh và ràng buộc định dạng để đảm bảo đầu ra đáng tin cậy.",
    level: "Cơ bản"
  },
  {
    id: 15,
    term: "Overfitting",
    ipa: "/ˌəʊ.vəˈfɪt.ɪŋ/",
    vietnameseTerm: "Hiện tượng quá khớp",
    category: "Đánh giá & Tối ưu",
    definition: "Lỗi trong học máy khi mô hình ghi nhớ quá chi tiết dữ liệu huấn luyện (kể cả nhiễu), dẫn đến dự đoán kém trên dữ liệu mới.",
    example: "Cross-validation and dropout layers are widely used to prevent overfitting in deep neural networks.",
    exampleVi: "Kiểm định chéo và lớp dropout được sử dụng rộng rãi nhằm ngăn chặn quá khớp trong mạng nơ-ron sâu.",
    level: "Trung cấp"
  }
];
