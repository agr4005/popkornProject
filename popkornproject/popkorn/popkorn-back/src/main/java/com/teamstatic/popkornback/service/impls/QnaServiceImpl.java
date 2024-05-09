package com.teamstatic.popkornback.service.impls;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.QnaDTO;
import com.teamstatic.popkornback.entity.Qna;
import com.teamstatic.popkornback.repository.QnaRepository;
import com.teamstatic.popkornback.service.QnaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

  @Autowired
  private QnaRepository qRepository;

  @Override
  public PageResultDTO<QnaDTO, Qna> findAllByTitle(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<Qna> result = qRepository.findAllByTitle(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findAllByID(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<Qna> result = qRepository.findAllByID(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findAllByContent(String keyword, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<Qna> result = qRepository.findAllByContent(keyword, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findAll(PageRequestDTO requestDTO) {
    Sort sort = Sort.by("postcreated").descending();
    Pageable pageable = requestDTO.getPageable(sort);
    Page<Qna> result = qRepository.findAllByKeywordLike(requestDTO.getKeyword(), pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findAllPosts(PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<Qna> result = qRepository.findAll(pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findPostsByCategory(String category, PageRequestDTO requestDTO) {
    Pageable pageable = requestDTO.getPageable(Sort.by("postcreated").descending());
    Page<Qna> result = qRepository.findByCategory(category, pageable);
    return new PageResultDTO<>(result, this::entityToDto);
  }

  @Override
  public PageResultDTO<QnaDTO, Qna> findByCategoryAndKeyword(String category, String keyword, Pageable pageable) {
    Page<Qna> result = qRepository.findByCategoryAndKeyword(category, keyword, pageable);
    return new PageResultDTO<>(result,this::entityToDto);
  }

  @Override
  public Qna updatePost(int sno, Qna updatedPost) {
    Qna post = qRepository.findBySno(sno);
    post.setTitle(updatedPost.getTitle());
    post.setContent(updatedPost.getContent());
    return qRepository.save(post);
}

@Override
public Qna updateReply(int sno, Qna updatedComment) {
  Qna comment = qRepository.findById(sno)
      .orElseThrow(() -> new RuntimeException("Comment not found with sno: " + sno));
  comment.setContent(updatedComment.getContent());
  return qRepository.save(comment);
}

@Override
public void deletePost(int sno) {
    Optional<Qna> post = qRepository.findById(sno);
    if (post.isPresent()) {
        qRepository.delete(post.get());
    } else {
        throw new EntityNotFoundException("No QNA found with SNO: " + sno);
    }
}

@Override
public Qna createQna(Qna qna) {
  return qRepository.save(qna);
}

@Override
public long getCommentCountForPost(int sno) {
  return qRepository.countByRoot(sno);
}

}
