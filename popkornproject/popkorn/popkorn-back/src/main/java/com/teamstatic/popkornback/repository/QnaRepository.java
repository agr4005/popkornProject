package com.teamstatic.popkornback.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamstatic.popkornback.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Integer> {

  @Query(value = "SELECT * FROM qna WHERE title LIKE CONCAT('%', :keyword, '%') AND root IS NULL", nativeQuery = true)
  Page<Qna> findAllByTitle(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM qna WHERE id LIKE CONCAT('%', :keyword, '%') AND root IS NULL", nativeQuery = true)
  Page<Qna> findAllByID(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM qna WHERE content LIKE CONCAT('%', :keyword, '%') AND root IS NULL", nativeQuery = true)
  Page<Qna> findAllByContent(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM qna q WHERE " +
      "(q.title LIKE CONCAT('%', :keyword, '%') OR " +
      "q.id LIKE CONCAT('%', :keyword, '%') OR " +
      "q.content LIKE CONCAT('%', :keyword, '%')) AND q.root IS NULL ", nativeQuery = true)
  Page<Qna> findAllByKeywordLike(String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM qna WHERE category = :category AND root IS NULL", nativeQuery = true)
  Page<Qna> findByCategory(String category, Pageable pageable);

  @Query("SELECT q FROM Qna q WHERE q.category = :category AND " +
      "(q.title LIKE %:keyword% OR q.id LIKE %:keyword% OR q.content LIKE %:keyword%) AND q.root IS NULL")
  Page<Qna> findByCategoryAndKeyword(String category, String keyword, Pageable pageable);

  @Query(value = "SELECT * FROM qna WHERE sno = :sno AND root IS NULL", nativeQuery = true)
  Qna findBySno(int sno);

  @Query(value = "DELETE FROM qna WHERE sno = :sno AND root IS NULL", nativeQuery = true)
  void deleteBySno(int sno);

  List<Qna> findByRoot(Integer root);

  @Query(value = "SELECT COUNT(*) FROM qna WHERE root = :sno", nativeQuery = true)
  long countByRoot(int sno);
}
