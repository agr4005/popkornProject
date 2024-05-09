package com.teamstatic.popkornback.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QnaDTO;
import com.teamstatic.popkornback.entity.Qna;

public interface QnaService {

  default QnaDTO entityToDto(Qna qna) {
    if (qna == null)
      return null;
    return QnaDTO.builder()
        .sno(qna.getSno())
        .root(qna.getRoot())
        .category(qna.getCategory())
        .title(qna.getTitle())
        .content(qna.getContent())
        .id(qna.getId())
        .postcreated(qna.getPostcreated())
        .build();
  }

  PageResultDTO<QnaDTO, Qna> findAllByTitle(String Refund, PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findAllByID(String transaction, PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findAllByContent(String etc, PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findAll(PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findAllPosts(PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findPostsByCategory(String category, PageRequestDTO requestDTO);

  PageResultDTO<QnaDTO, Qna> findByCategoryAndKeyword(String category, String keyword, Pageable pageable);
  
  Qna updatePost(int sno, Qna updatedPost);

  void deletePost(int sno);

  Qna createQna(Qna qna);

  Qna updateReply(int sno, Qna updatedComment);

  long getCommentCountForPost(int sno);
  
}
